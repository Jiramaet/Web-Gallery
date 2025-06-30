import React from 'react'

function Container({ children }) {
  return (
    //โค้ดด้านล่างนี้เป็นฟังก์ชัน React ที่ชื่อ Container ที่มีความหมายว่า เป็นคอมโพเนนต์ที่รับ children แล้วนำมาแสดงผลภายใน div โดยกำหนด class เป็น 'flex flex-col min-h-screen':
    <div className='flex flex-col min-h-screen'>
        {children}
    </div>
  )
}

export default Container