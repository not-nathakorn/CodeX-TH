// src/pages/CallbackPage.tsx
// --------------------------------------------------------
// OAuth Callback Handler - SECURE VERSION
// ✅ Exchanges code for tokens
// ✅ Receives HttpOnly Cookies automatically
// ✅ Redirects to dashboard after success
// --------------------------------------------------------
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LazyFallback from "@/components/LazyFallback";

const AUTH_HUB = import.meta.env.VITE_BLACKBOX_AUTH_URL || "https://bbh.codex-th.com";
const CLIENT_ID = import.meta.env.VITE_BLACKBOX_CLIENT_ID;

export default function CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshAuth } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      // Handle errors
      if (error) {
        console.error("Auth Error:", error);
        navigate("/login?error=" + error);
        return;
      }

      if (!code) {
        navigate("/");
        return;
      }

      try {
        // ✅ Exchange code for tokens
        const response = await fetch(`${AUTH_HUB}/api/oauth/token`, {
          method: "POST",
          credentials: "include", // ✅ รับ HttpOnly Cookies
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            client_id: CLIENT_ID,
            client_secret: import.meta.env.VITE_BLACKBOX_CLIENT_SECRET,
            grant_type: "authorization_code"
          })
        });

        const data = await response.json();
        console.log("Token exchange response:", data);

        if (data.success && data.user) {
          // ✅ Cookie ถูก set แล้ว รอสักครู่ให้ Browser บันทึก Cookie (Localhost อาจจะช้าหน่อย)
          console.log("Cookie set attempt finished. Waiting for propagation...");
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          console.log("Attempting to verify session via refreshAuth()...");
          await refreshAuth();
          
          // Redirect to home or original page
          const returnUrl = searchParams.get("state") || "/";
          navigate(returnUrl);
        } else {
          console.error("Token exchange failed:", data);
          navigate("/login?error=token_exchange_failed");
        }
      } catch (err) {
        console.error("Callback error:", err);
        navigate("/login?error=callback_failed");
      }
    };

    handleCallback();
  }, [searchParams, navigate, refreshAuth]);

  return (
    <LazyFallback message="Setting up your secure session..." />
  );
}

