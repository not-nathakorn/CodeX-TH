# 🔐 BlackBox Authentication - Fix Implementation Guide

**วันที่:** 2025-12-10  
**สถานะ:** ⚠️ **REQUIRES UPDATE**

---

## 📊 สรุปปัญหาและแนวทางแก้ไข

### ปัญหาหลัก:

1. ✅ **auth.ts สร้างแล้ว** - Token management utilities
2. ⚠️ **AuthContext.tsx ต้องอัปเดต** - ขาด user data handling
3. ⚠️ **CallbackPage.tsx ต้องอัปเดต** - ไม่ได้ parse user_info
4. ⚠️ **AuthGuard.tsx ต้องอัปเดต** - ขาด bypass mode

---

## 🛠️ ขั้นตอนการแก้ไข

### ขั้นตอนที่ 1: ✅ สร้าง auth.ts (เสร็จแล้ว)

ไฟล์ `src/utils/auth.ts` ถูกสร้างแล้ว ✅

**ฟังก์ชันที่มี:**

- `isAuthenticated()` - ตรวจสอบ login status
- `isBypassed()` - ตรวจสอบ dev mode
- `logout()` - ล้าง session
- `getAccessToken()` - ดึง token
- `getUserData()` - ดึง user data
- `saveAuthData()` - บันทึก auth data
- `saveBypassed()` - เปิด dev mode

---

### ขั้นตอนที่ 2: อัปเดต AuthContext.tsx

**ไฟล์:** `src/contexts/AuthContext.tsx`

**การเปลี่ยนแปลง:**

1. **Import auth utilities**

   ```typescript
   import {
     User,
     isAuthenticated,
     isBypassed,
     getUserData,
     logout as authLogout,
   } from "../utils/auth";
   ```

2. **อัปเดต interface**

   ```typescript
   interface AuthContextType {
     user: User | null;
     isAuthenticated: boolean;
     isBypassed: boolean;
     login: () => void;
     logout: () => void;
     isLoading: boolean;
   }
   ```

3. **อัปเดต state**

   ```typescript
   const [user, setUser] = useState<User | null>(null);
   const [bypassed, setBypassed] = useState(false);
   ```

4. **อัปเดต checkAuth function**

   ```typescript
   const checkAuth = () => {
     const authenticated = isAuthenticated();
     const bypassMode = isBypassed();

     if (authenticated) {
       const userData = getUserData();
       setUser(userData);
       setBypassed(false);
     } else if (bypassMode) {
       setBypassed(true);
       setUser(null);
     } else {
       setUser(null);
       setBypassed(false);
     }
     setIsLoading(false);
   };
   ```

5. **อัปเดต login function**

   ```typescript
   const login = () => {
     if (!CLIENT_ID || !REDIRECT_URI) return;
     const baseUrl = AUTH_URL.endsWith("/login")
       ? AUTH_URL
       : `${AUTH_URL}/login`;
     window.location.href = `${baseUrl}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
       REDIRECT_URI
     )}`;
   };
   ```

6. **อัปเดต logout function**
   ```typescript
   const logout = () => {
     authLogout();
     setUser(null);
     setBypassed(false);
     if (CLIENT_ID && REDIRECT_URI) {
       window.location.href = `${AUTH_URL}/login?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
         REDIRECT_URI
       )}&prompt=login`;
     }
   };
   ```

---

### ขั้นตอนที่ 3: อัปเดต CallbackPage.tsx

**ไฟล์:** `src/pages/CallbackPage.tsx`

**การเปลี่ยนแปลง:**

1. **Import utilities**

   ```typescript
   import { saveAuthData, saveBypassed, User } from "../utils/auth";
   ```

2. **Handle Bypass Mode**

   ```typescript
   if (searchParams.get("skipped_login") === "true") {
     saveBypassed();
     const returnUrl = localStorage.getItem("return_url") || "/";
     localStorage.removeItem("return_url");
     navigate(returnUrl);
     return;
   }
   ```

3. **Parse URL Hash**

   ```typescript
   const hash = window.location.hash.substring(1);
   const hashParams = new URLSearchParams(hash);
   const accessToken = hashParams.get("access_token");
   const userInfoStr = hashParams.get("user_info");
   ```

4. **Parse User Data**

   ```typescript
   if (accessToken && userInfoStr) {
     try {
       const user = JSON.parse(userInfoStr) as User;
       const expiresIn = hashParams.get("expires_in") || "3600";
       saveAuthData(accessToken, null, parseInt(expiresIn), user);

       const returnUrl = localStorage.getItem("return_url") || "/";
       localStorage.removeItem("return_url");
       navigate(returnUrl);
     } catch (e) {
       console.error("Failed to parse user data:", e);
       navigate("/login");
     }
   } else {
     navigate("/login");
   }
   ```

---

### ขั้นตอนที่ 4: สร้าง AuthGuard.tsx

**ไฟล์:** `src/components/AuthGuard.tsx`

**เนื้อหา:**

```typescript
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSearchParams, useLocation } from "react-router-dom";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isBypassed, isLoading, login } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Loop Prevention: If on Callback page, allow access
  if (location.pathname === "/admin/callback") return <>{children}</>;

  useEffect(() => {
    if (isLoading) return;

    const skippedLogin = searchParams.get("skipped_login") === "true";

    if (!isAuthenticated && !isBypassed && !skippedLogin) {
      localStorage.setItem("return_url", location.pathname + location.search);
      login();
    }
  }, [isAuthenticated, isBypassed, isLoading, login, searchParams, location]);

  if (isLoading) return <div>Authenticating...</div>;

  if (
    isAuthenticated ||
    isBypassed ||
    searchParams.get("skipped_login") === "true"
  ) {
    return <>{children}</>;
  }
  return null;
};
```

---

## 4. 🔍 การตรวจสอบ Environment Variables

### ตรวจสอบ .env:

```bash
VITE_BLACKBOX_AUTH_URL=https://bbh.codex-th.com
VITE_CLIENT_ID=client_2odewqb56br
VITE_REDIRECT_URI=http://localhost:8080/admin/callback
```

**สำหรับ Production:**

```bash
VITE_REDIRECT_URI=https://your-domain.com/admin/callback
```

**ตรวจสอบใน BlackBox Dashboard:**

1. เข้า BlackBox Admin
2. ไปที่ Client Settings
3. ตรวจสอบว่า `client_2odewqb56br` มี:
   - ✅ Redirect URI: `http://localhost:8080/admin/callback`
   - ✅ Redirect URI: `https://your-domain.com/admin/callback`
   - ✅ Grant Types: `authorization_code`, `implicit`
   - ✅ Response Types: `token`, `id_token`

---

## 5. 🧪 การทดสอบ

### Test Case 1: Login Flow

1. เข้า `/admin`
2. ระบบควร redirect ไป BlackBox login
3. Login ด้วย credentials ที่ถูกต้อง
4. BlackBox redirect กลับมาที่ `/admin/callback#access_token=...&user_info=...`
5. CallbackPage parse data และ save
6. Redirect ไป `/admin`

### Test Case 2: Token Expiration

1. Login สำเร็จ
2. รอให้ token หมดอายุ (หรือแก้ไข expires_at ใน localStorage)
3. Refresh page
4. ระบบควร logout อัตโนมัติ
5. Redirect ไป login page

### Test Case 3: Bypass Mode (Dev)

1. เข้า `/admin?skipped_login=true`
2. ระบบควรให้เข้าได้โดยไม่ต้อง login
3. ไม่มี user data แต่ isBypassed = true

---

## 6. 🐛 Debug Tips

### ตรวจสอบ Console Logs:

```javascript
// ใน CallbackPage
console.log("Hash:", window.location.hash);
console.log("Access Token:", accessToken);
console.log("User Info:", userInfoStr);
console.log("Parsed User:", user);
```

### ตรวจสอบ LocalStorage:

```javascript
console.log("bb_access_token:", localStorage.getItem("bb_access_token"));
console.log("bb_user_data:", localStorage.getItem("bb_user_data"));
console.log("bb_expires_at:", localStorage.getItem("bb_expires_at"));
```

### ตรวจสอบ Network:

1. เปิด DevTools → Network tab
2. ดู redirect จาก BlackBox
3. ตรวจสอบ URL hash parameters
4. ดู response headers

---

## 7. ⚠️ Common Issues

### Issue 1: "Invalid credentials"

**สาเหตุ:**

- Username/Password ผิด
- User ไม่มีใน BlackBox
- User ถูก disable

**แก้ไข:**

- ตรวจสอบ credentials
- สร้าง user ใน BlackBox
- Enable user account

### Issue 2: "Redirect URI mismatch"

**สาเหตุ:**

- Redirect URI ใน .env ไม่ตรงกับที่ตั้งใน BlackBox

**แก้ไข:**

- ตรวจสอบ VITE_REDIRECT_URI
- อัปเดต BlackBox client settings
- ต้องตรงทุกตัวอักษร (รวม http/https, port)

### Issue 3: "No user_info in URL"

**สาเหตุ:**

- BlackBox ไม่ส่ง user_info
- Response type ไม่ถูกต้อง

**แก้ไข:**

- ตรวจสอบ response_type=token
- เพิ่ม scope=openid profile email
- ตรวจสอบ BlackBox configuration

### Issue 4: "Token expired immediately"

**สาเหตุ:**

- Server time ไม่ตรง
- expires_in คำนวณผิด

**แก้ไข:**

- ตรวจสอบ system time
- ตรวจสอบ timezone
- Debug expires_in value

---

## 8. ✅ Checklist

### Code Updates:

- [ ] สร้าง `src/utils/auth.ts` ✅ (เสร็จแล้ว)
- [ ] อัปเดต `src/contexts/AuthContext.tsx`
- [ ] อัปเดต `src/pages/CallbackPage.tsx`
- [ ] สร้าง `src/components/AuthGuard.tsx`
- [ ] อัปเดต routes ใน `src/App.tsx`

### Configuration:

- [ ] ตรวจสอบ .env variables
- [ ] ตรวจสอบ BlackBox client settings
- [ ] ตรวจสอบ redirect URIs
- [ ] ตรวจสอบ response types

### Testing:

- [ ] ทดสอบ login flow
- [ ] ทดสอบ logout
- [ ] ทดสอบ token expiration
- [ ] ทดสอบ bypass mode
- [ ] ทดสอบ return URL

---

## 9. 📝 สรุป

### สถานะปัจจุบัน:

**ที่ทำแล้ว:**

- ✅ สร้าง `auth.ts` utilities

**ที่ต้องทำต่อ:**

- ⚠️ อัปเดต AuthContext
- ⚠️ อัปเดต CallbackPage
- ⚠️ สร้าง AuthGuard
- ⚠️ ทดสอบ integration

### ลำดับความสำคัญ:

1. 🔴 **สูง:** อัปเดต CallbackPage (ต้องทำก่อน)
2. 🔴 **สูง:** อัปเดต AuthContext
3. ⚠️ **กลาง:** สร้าง AuthGuard
4. ✅ **ต่ำ:** ทดสอบและ debug

### เวลาที่คาดว่าจะใช้:

- อัปเดตโค้ด: ~30 นาที
- ทดสอบ: ~15 นาที
- Debug (ถ้ามีปัญหา): ~30 นาที
- **รวม:** ~1-2 ชั่วโมง

---

**จัดทำโดย:** Antigravity AI  
**วันที่:** 2025-12-10  
**Status:** ⚠️ **READY TO IMPLEMENT**
