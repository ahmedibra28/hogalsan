import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CustomNav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <Image
            src="/qaran.png"
            alt="Logo"
            width="220"
            height="70"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/web-hosting/"
              >
                Web Hosting
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/register-domain/"
              >
                Domain
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/web-development/"
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/success-stories/"
              >
                Success Stories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/client/submitticket.php?step=2&deptid=1"
              >
                Submit Ticket
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-uppercase text-dark fw-bold"
                aria-current="page"
                href="https://qaranweb.com/themes/"
              >
                Themes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default CustomNav
