import React from 'react'

interface Item {
  price: number
  feature: number
  label: string
  duration: string
}

const PackageItem = ({ item }: { item: Item }) => {
  return (
    <div className="card border-0 rounded-2 shadow">
      <div
        className="w-100 bg-success text-light rounded-2 position-absolutes d-flex justify-content-center align-items-center"
        style={{
          clipPath: 'polygon(0 0, 100% 0%, 100% 53%, 51% 100%, 0 53%)',
        }}
      >
        <span className="fs-3 fw-bold mb-3 mt-2 fontSize-90">
          ${item.price}
        </span>
      </div>
      <div className="card-body text-center pt-0 pb-2">
        <small className="text-uppercase fw-bold text-muted fontSize-70">
          {item.feature}
        </small>
        <div style={{ marginTop: -8 }}>
          <small className="fw-light fontSize-70">{item.duration}</small>
        </div>
        <div style={{ marginTop: -8 }}>
          <small className="text-uppercase fw-bold text-success fontSize-70 my-0 py-0">
            {item.label}
          </small>
        </div>
      </div>
    </div>
  )
}

export default PackageItem
