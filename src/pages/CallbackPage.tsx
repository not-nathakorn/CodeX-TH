// src/pages/CallbackPage.tsx
// --------------------------------------------------------
// OAuth Callback Handler - CROSS-DOMAIN COMPATIBLE VERSION
// ✅ Exchanges code for tokens
// ✅ Uses setUserDirectly to bypass cookie limitations
// ✅ Works even when cookies don't work across domains
// --------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AUTH_HUB = import.meta.env.VITE_BLACKBOX_AUTH_URL || "https://bbh.codex-th.com";
const CLIENT_ID = import.meta.env.VITE_BLACKBOX_CLIENT_ID;

export default function CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserDirectly, refreshAuth } = useAuth();
  const processedRef = useRef(false);
  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      // Handle errors
      if (error) {
        console.error("Auth Error:", error);
        setStatus("error");
        setErrorMessage(error);
        setTimeout(() => navigate("/login?error=" + error), 2000);
        return;
      }

      if (!code) {
        navigate("/");
        return;
      }

      try {
        console.log("🔄 Exchanging code for tokens...");
        
        // ✅ Exchange code for tokens
        const response = await fetch(`${AUTH_HUB}/api/oauth/token`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            client_id: CLIENT_ID,
            grant_type: "authorization_code"
          })
        });

        const data = await response.json();
        console.log("📦 Token response:", data.success ? "SUCCESS" : "FAILED");

        if (data.success && data.user) {
          // ✅ Set user, token, AND expiry (bypasses cookie requirement)
          console.log("🔐 Setting user and token, expires_in:", data.expires_in);
          setUserDirectly({
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            role: data.user.role || "end_user"
          }, data.access_token, data.expires_in); // ✅ Pass token AND expiry

          setStatus("success");
          
          // Try refresh in background (may fail for cross-domain, that's OK)
          refreshAuth().catch(() => {
            console.log("ℹ️ Background refresh failed (normal for cross-domain)");
          });
          
          // Redirect after a short delay to ensure state is propagated
          const returnUrl = searchParams.get("state") || "/";
          console.log("➡️ Redirecting to:", returnUrl);
          setTimeout(() => navigate(returnUrl), 800);
          
        } else {
          console.error("Token exchange failed:", data);
          setStatus("error");
          setErrorMessage(data.error || "Token exchange failed");
          setTimeout(() => navigate("/login?error=token_exchange_failed"), 2000);
        }
      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setErrorMessage("Network error");
        setTimeout(() => navigate("/login?error=callback_failed"), 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUserDirectly, refreshAuth]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {status === "processing" && (
          <>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Processing Login...</h2>
            <p className="text-gray-500">Please wait</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-green-600">Login Successful!</h2>
            <p className="text-gray-500">Redirecting...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white">✕</span>
            </div>
            <h2 className="text-xl font-semibold text-red-600">Login Failed</h2>
            <p className="text-gray-500">{errorMessage || "An error occurred"}</p>
          </>
        )}
      </div>
    </div>
  );
}
