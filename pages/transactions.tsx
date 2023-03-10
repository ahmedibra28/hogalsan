import React, { useState, useEffect, FormEvent } from 'react'
import dynamic from 'next/dynamic'
import withAuth from '../HoC/withAuth'
import { useForm } from 'react-hook-form'
import { Spinner, Pagination, Message, Search, Meta } from '../components'
import {
  DynamicFormProps,
  dynamicInputSelect,
  inputNumber,
} from '../utils/dForms'
import FormView from '../components/FormView'
import apiHook from '../api'
import { ITransaction } from '../models/Transaction'
import { IPackage } from '../models/Package'
import moment from 'moment'
import { currency } from '../utils/currency'

const Transaction = () => {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')

  const getPackagesApi = apiHook({
    key: ['packages-transaction'],
    method: 'GET',
    url: `packages?page=${page}&q=${q}&limit=${250}`,
  })?.get

  const getApi = apiHook({
    key: ['transactions'],
    method: 'GET',
    url: `transactions?page=${page}&q=${q}&limit=${25}`,
  })?.get

  const postApi = apiHook({
    key: ['transactions'],
    method: 'POST',
    url: `transactions`,
  })?.post

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    if (postApi?.isSuccess) formCleanHandler()
    getApi?.refetch()
    document.getElementById('dismissModal')?.click()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess])

  useEffect(() => {
    getApi?.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!q) getApi?.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const searchHandler = (e: FormEvent) => {
    e.preventDefault()
    getApi?.refetch()
    setPage(1)
  }

  const name = 'Transaction List'
  const label = 'Transaction'
  const modal = 'transaction'

  // FormView
  const formCleanHandler = () => {
    reset()
  }

  const submitHandler = (data: object) => {
    postApi?.mutateAsync(data)
  }

  const form = [
    <div key={0} className="col-12">
      {dynamicInputSelect({
        register,
        errors,
        label: 'Package',
        name: 'package',
        value: 'duration',
        placeholder: 'Select package',
        data: getPackagesApi?.data?.data?.filter(
          (item: IPackage) => item.status === 'active'
        ),
      } as DynamicFormProps)}
    </div>,
    <div key={1} className="col-12">
      {inputNumber({
        register,
        errors,
        label: 'Sender',
        name: 'sender',
        placeholder: 'Enter sender',
      } as DynamicFormProps)}
    </div>,
    <div key={2} className="col-12">
      {inputNumber({
        register,
        errors,
        label: 'Receiver',
        name: 'receiver',
        placeholder: 'Enter receiver',
      } as DynamicFormProps)}
    </div>,
  ]

  const modalSize = 'modal-md'

  return (
    <>
      <Meta title="Transaction" />

      {getPackagesApi?.isError && (
        <Message variant="danger" value={getPackagesApi?.error} />
      )}
      {postApi?.isSuccess && (
        <Message
          variant="success"
          value={`${label} has been Created successfully.`}
        />
      )}
      {postApi?.isError && <Message variant="danger" value={postApi?.error} />}

      <div className="ms-auto text-end">
        <Pagination data={getApi?.data} setPage={setPage} />
      </div>

      <FormView
        edit={false}
        formCleanHandler={formCleanHandler}
        form={form}
        isLoadingUpdate={false}
        isLoadingPost={postApi?.isLoading}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        modal={modal}
        label={label}
        modalSize={modalSize}
      />

      {getApi?.isLoading ? (
        <Spinner />
      ) : getApi?.isError ? (
        <Message variant="danger" value={getApi?.error} />
      ) : (
        <div className="table-responsive bg-light p-3 mt-2">
          <div className="d-flex align-items-center flex-column mb-2">
            <h3 className="fw-light text-muted">
              {name}
              <sup className="fs-6"> [{getApi?.data?.total}] </sup>
            </h3>
            <button
              className="btn btn-outline-primary btn-sm shadow my-2"
              data-bs-toggle="modal"
              data-bs-target={`#${modal}`}
            >
              Add New {label}
            </button>
            <div className="col-auto">
              <Search
                placeholder="Search by transaction name"
                setQ={setQ}
                q={q}
                searchHandler={searchHandler}
              />
            </div>
          </div>
          <table className="table table-sm table-border">
            <thead className="border-0">
              <tr>
                <th>Package</th>
                <th>Payment Method</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {getApi?.data?.data?.map((item: ITransaction, i: number) => (
                <tr key={i}>
                  <td>
                    {`${item?.package?.company} - ${item?.package?.feature} ${
                      item?.package?.duration
                    } - ${currency(item?.package?.price)} - ${
                      item?.package?.label
                    } `}
                  </td>
                  <td>
                    {item?.paymentMethod === 'manual' ? (
                      <span className="badge bg-warning">
                        {item?.paymentMethod}{' '}
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        {item?.paymentMethod}{' '}
                      </span>
                    )}
                  </td>
                  <td>{item?.sender}</td>
                  <td>{item?.receiver}</td>
                  <td>{moment(item?.createdAt).format()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Transaction)), {
  ssr: false,
})
