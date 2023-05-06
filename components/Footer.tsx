import Image from 'next/image'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

const Footer = () => {
  const services = [
    {
      name: 'Web Hosting',
      href: 'https://qaranweb.com/web-hosting/',
    },
    {
      name: 'Web Development',
      href: 'https://qaranweb.com/web-development/',
    },
    {
      name: 'Web Design',
      href: 'https://qaranweb.com/web-design/',
    },
    {
      name: 'Web Solutions',
      href: 'https://qaranweb.com/web-solutions/',
    },
    {
      name: 'Ecommerce Services',
      href: 'https://qaranweb.com/ecommerce-services/',
    },
    {
      name: 'Ecommerce Solutions',
      href: 'https://qaranweb.com/ecommerce-solutions/',
    },
    {
      name: 'SEO Services',
      href: 'https://qaranweb.com/seo-services/',
    },
  ]
  const domains = [
    {
      name: 'Register Domain',
      href: 'https://qaranweb.com/register-domain/',
    },
    {
      name: 'Transfer Domain',
      href: 'https://qaranweb.com/transfer-domain/',
    },
  ]
  const support = [
    {
      name: 'Client',
      href: 'https://qaranweb.com/web-development/#',
    },
    {
      name: 'Login',
      href: 'https://qaranweb.com/client/index.php?rp=/login',
    },
    {
      name: 'Register',
      href: 'https://qaranweb.com/client/register.php',
    },
  ]
  const other = [
    { name: '✅ theme diyaarsan' },
    { name: '✅ Installation free aha' },
    { name: '✅ Domain regesteration' },
    { name: '✅ Webhosting dagdag ah' },
    { name: '✅ Lacag bixin fudud qasab ma ah inaad bank card haysato' },
    { name: '✅ Web design saad rabto lagugu samayn hayo' },
  ]
  return (
    <footer
      className="text-primary container-fluid bg-dark"
      style={{ minHeight: 55 }}
    >
      <div className="container py-5">
        <div className="row text-white">
          <div className="col-lg-3 col-md-6 col-12 mx-auto">
            <h5 className="fw-bold">SERVICES</h5>
            {services?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-decoration-none text-white"
              >
                <li className="py-2" style={{ listStyle: 'none' }}>
                  <FaChevronRight /> {item.name}
                </li>
              </Link>
            ))}
          </div>
          <div className="col-lg-3 col-md-6 col-12 mx-auto">
            <h5 className="fw-bold">DOMAINS</h5>
            {domains?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-decoration-none text-white"
              >
                <li className="py-2" style={{ listStyle: 'none' }}>
                  <FaChevronRight /> {item.name}
                </li>
              </Link>
            ))}
          </div>
          <div className="col-lg-3 col-md-6 col-12 mx-auto">
            <h5 className="fw-bold">SUPPORT</h5>
            {support?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-decoration-none text-white"
              >
                <li className="py-2" style={{ listStyle: 'none' }}>
                  <FaChevronRight /> {item.name}
                </li>
              </Link>
            ))}
          </div>
          <div className="col-lg-3 col-md-6 col-12 mx-auto">
            <h5 className="fw-bold">MAXAAD KU DOORAN HAYSAA QARANWEB</h5>
            <p>The waxaad qaranweb kudooran haysa inaad ka helasyo..</p>
            {other?.map((item) => (
              <li
                key={item.name}
                className="py-2"
                style={{ listStyle: 'none' }}
              >
                {item.name}
              </li>
            ))}
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 col-12">
              <h6>Qaranweb © 2021 - All rights reserved</h6>
            </div>
            <div className="col-md-6 col-12">
              <div
                className="col text-center py-1 footer font-monospace  my-auto"
                style={{ fontSize: 12 }}
              >
                Developed by{' '}
                <a
                  className="text-white"
                  target="_blank"
                  href="https://ahmedibra.com"
                  rel="noreferrer"
                >
                  Ahmed Ibrahim
                </a>
                <Image
                  src="/logo.png"
                  width="15"
                  height="15"
                  alt="logo"
                  className="my-auto ms-2"
                />
              </div>
            </div>
          </div>
          <div className="col-12 p-2"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
