import React, { Fragment, useState } from 'react'
import NavItem from './NavItem'
import PackageItem from './PackageItem'
import apiHook from '../../api'
import Spinner from '../Spinner'
import Message from '../Message'
import { IPackage } from '../../models/Package'
import RechargeForm from './RechargeForm'

export interface IPacakgeProps {
  company: string
  packages: {
    category: string
    items: {
      price: number
      feature: string
      label: string
      name: string
    }[]
  }[]
}

const Index = () => {
  const [comp, setComp] = useState('Hormuud')
  const [pkg, setPkg] = useState('')

  const getApi = apiHook({
    key: ['public-packages'],
    method: 'GET',
    url: `packages?page=${1}&q=&limit=${250}`,
  })?.get

  const navItems = [
    { image: '/images/somtel.png', name: 'Somtel' },
    { image: '/images/somlink.png', name: 'Somlink' },
    { image: '/images/hormuud.png', name: 'Hormuud' },
    { image: '/images/somnet.png', name: 'Somnet' },
  ]

  const packages = getApi?.data?.data
    ?.filter((item: IPackage) => item.company === comp)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ?.reduce((acc: IPacakge[], item: IPackage) => {
      const { company, category, ...rest } = item
      const index = acc.findIndex((i) => i.company === company)
      if (index === -1) {
        acc.push({
          company,
          packages: [
            {
              category: category.name,
              items: [rest],
            },
          ],
        })
      } else {
        const packageIndex = acc[index].packages.findIndex(
          (i: any) => i.category === category.name
        )
        if (packageIndex === -1) {
          acc[index].packages.push({
            category: category.name,
            items: [rest],
          })
        } else {
          acc[index].packages[packageIndex].items.push(rest)
        }
      }
      return acc
    }, [])

  return (
    <div className="row my-5">
      <RechargeForm />
      <div className="col-lg-7 col-md-10 col-12 mx-auto">
        <div className="row gy-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="col-3"
              onClick={() => {
                setComp(item.name)
                setPkg('')
              }}
            >
              <NavItem item={item} comp={comp} />
            </div>
          ))}
          {getApi?.isLoading ? (
            <Spinner />
          ) : getApi?.isError ? (
            <Message variant="danger" value={getApi?.error} />
          ) : (
            packages.map((item: IPacakgeProps) =>
              item.packages.map((item, index) => (
                <Fragment key={index}>
                  <div className="col-12 mt-3 animate__animated animate__fadeIn">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <span className="text-muted text-nowrap">
                        {item.category}
                      </span>
                      <span className="border ms-2 w-100"></span>
                    </div>
                  </div>
                  {item.items.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setPkg(item.name)}
                      data-bs-toggle="modal"
                      data-bs-target="#recharge"
                      className={`col-lg-3 col-md-4 col-4 ${
                        pkg === item.name
                          ? 'animate__animated animate__tada'
                          : ''
                      }`}
                    >
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <PackageItem item={item} />
                    </div>
                  ))}
                </Fragment>
              ))
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
