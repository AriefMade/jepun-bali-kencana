# Setup Prisma untuk Autentikasi

Berikut langkah-langkah untuk menyelesaikan setup Prisma autentikasi:

## 1. Update Environment Variables

Buka/buat file `.env.local` di root project dan sesuaikan dengan konfigurasi database Anda:

```env
# Database MySQL
DATABASE_URL="mysql://user:password@localhost:3306/jepun_bali_kencana"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-very-secure-secret-key-here
```

**Untuk production:**
- Gunakan NEXTAUTH_SECRET yang strong (generate dengan: `openssl rand -base64 32`)
- Update NEXTAUTH_URL sesuai domain production
- Gunakan database server yang secure

## 2. Install Dependencies

```bash
npm install
```

Ini akan install:
- `@prisma/client` - Prisma ORM client
- `next-auth` - Authentication library (sudah ada)
- `@next-auth/prisma-adapter` - Adapter untuk NextAuth + Prisma
- `bcryptjs` - Password hashing (sudah ada)

## 3. Push Schema ke Database

```bash
npx prisma db push
```

Perintah ini akan:
- Membuat/update tables di MySQL sesuai schema.prisma
- Membuat tables: `users`, `accounts`, `sessions`, `verification_tokens`
- Tetap maintain existing tables: `admins`, `products`, `testimonials`, `profile_data`

## 4. (Optional) Seed Database dengan Admin User

Buat file `prisma/seed.ts`:

```typescript
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  })

  if (existingAdmin) {
    console.log("Admin user already exists")
    return
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  })

  console.log("Admin created:", admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Update `package.json` scripts:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Jalankan:
```bash
npx prisma db seed
```

## 5. Verifikasi Setup

### Check Tables:
```bash
npx prisma studio
```

Buka browser di `http://localhost:5555` untuk melihat data di database secara visual.

### Test Login:

1. Buka http://localhost:3000/login
2. Masukkan email: `admin@example.com`
3. Masukkan password: `admin123` (atau sesuai yang Anda set di seed)
4. Jika berhasil, akan redirect ke admin panel

## 6. Fitur yang Sudah Tersedia

### Models yang Sudah Siap:

1. **User** - Main authentication model
   - `id`, `email`, `password`, `name`, `image`, `role`, `createdAt`, `updatedAt`

2. **Account** - OAuth integration (untuk Google, GitHub, dll di masa depan)

3. **Session** - JWT session management

4. **VerificationToken** - Email verification (future use)

5. **Admin** - Legacy model (bisa migrate ke User model)

## 7. Menggunakan Prisma di Code

### Contoh di API Route:
```typescript
import { prisma } from "@/lib/db"

export async function GET() {
  const users = await prisma.user.findMany()
  return Response.json(users)
}
```

### Contoh di Server Component:
```typescript
import { prisma } from "@/lib/db"

export default async function Page() {
  const products = await prisma.product.findMany()
  return <div>{/* render products */}</div>
}
```

## 8. Helpful Commands

```bash
# View database dalam Prisma Studio
npx prisma studio

# Generate Prisma Client (auto-run)
npx prisma generate

# Reset database (HATI-HATI!)
npx prisma db push --force-reset

# Create migration (untuk version control)
npx prisma migrate dev --name init
```

## 9. Tips Keamanan

- ✅ Password di-hash dengan bcryptjs sebelum disimpan
- ✅ Session menggunakan JWT (stateless)
- ✅ Role-based access control sudah siap (Admin, User, Superadmin)
- ✅ NEXTAUTH_SECRET harus strong dan di-env
- ⚠️ Jangan commit `.env.local` (sudah di .gitignore)

## Next Steps

1. Set DATABASE_URL dengan credential database Anda
2. Run `npm install`
3. Run `npx prisma db push`
4. (Optional) Run `npx prisma db seed`
5. Test dengan `npm run dev`

Selamat! Setup Prisma untuk autentikasi sudah siap! 🎉
