import Image from 'next/image'
import React from 'react'

const NavItem = ({
  item,
  comp,
}: {
  item: { name: string; image: string }
  comp: stirng
}) => {
  return (
    <div
      className={`card border-0 rounded-2 shadow-sm ${
        comp === item.name ? 'shadow-lg animate__animated animate__tada' : ''
      } `}
    >
      <div className="card-body text-center">
        <Image
          src={item.image}
          alt="logo"
          width={100}
          height={100}
          className="w-auto img-fluid"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default NavItem
