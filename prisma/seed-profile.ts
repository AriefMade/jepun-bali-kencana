import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding profile data...')
  
  // Check if profile data already exists
  const existingProfile = await prisma.profileData.findFirst()
  
  if (existingProfile) {
    console.log('✅ Profile data already exists, updating...')
    await prisma.profileData.update({
      where: { id: existingProfile.id },
      data: {
        phone: '+62 878-5605-2262',
        address: 'Pemaron, Kec. Buleleng, Kabupaten Buleleng, Bali',
        facebook: 'https://facebook.com/jepunbalikencana',
        whatsapp: 'https://wa.me/6287856052262',
        instagram: 'https://instagram.com/jepunbalikencana',
        gmaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7241609902394!2d115.06136577500862!3d-8.129540291900181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b007c2426d3%3A0xfcba4a551fcaefa3!2sJepun%20Bali%20Kencana!5e0!3m2!1sid!2sid!4v1765445590587!5m2!1sid!2sid'
      }
    })
    console.log('✅ Profile data updated successfully')
  } else {
    console.log('✅ Creating new profile data...')
    await prisma.profileData.create({
      data: {
        phone: '+62 878-5605-2262',
        address: 'Pemaron, Kec. Buleleng, Kabupaten Buleleng, Bali',
        facebook: 'https://facebook.com/jepunbalikencana',
        whatsapp: 'https://wa.me/6287856052262',
        instagram: 'https://instagram.com/jepunbalikencana',
        gmaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7241609902394!2d115.06136577500862!3d-8.129540291900181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b007c2426d3%3A0xfcba4a551fcaefa3!2sJepun%20Bali%20Kencana!5e0!3m2!1sid!2sid!4v1765445590587!5m2!1sid!2sid'
      }
    })
    console.log('✅ Profile data created successfully')
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding profile data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
