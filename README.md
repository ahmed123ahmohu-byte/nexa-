# Nexa

واجهة مستقبلية احترافية لـ Nexa (Splash + Login + Chat + Code Preview) مع تجربة عربية عالمية.

## تشغيل محلي

```bash
python3 -m http.server 4173
```

ثم افتح:

`http://localhost:4173`

## نشر على الإنترنت

### Vercel (الأسرع)
1. ارفع المشروع على GitHub.
2. من Vercel: **New Project**.
3. اختر المستودع ثم **Deploy**.
4. لا يحتاج Build Command (موقع static).

### Netlify
1. ارفع المشروع على GitHub.
2. من Netlify: **Add new site** → **Import from Git**.
3. Build command: (اتركه فارغ)
4. Publish directory: `.`

## المميزات المنفذة
- Splash سينمائي مع Typewriter وتأثيرات particles.
- Login بسيط جدًا (الاسم فقط).
- شات عصري بأسلوب glassmorphism.
- شخصية Nexa ودية + تتحول للوضع الاحترافي عند الحاجة.
- دعم لغة تلقائي (عربي/إنجليزي) + زر تبديل لغة.
- وضع كود تلقائي مع Syntax Highlighting + Copy + Run (JavaScript).
- زر إغلاق وضع الكود والعودة للشات الكامل بسلاسة.
- صوت نقر اختياري.
