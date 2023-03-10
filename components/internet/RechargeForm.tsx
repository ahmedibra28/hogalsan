import React from 'react'
import { FaMobileAlt, FaPaperPlane, FaTimesCircle } from 'react-icons/fa'

const RechargeForm = () => {
  return (
    <div
      className="modal fade"
      id="recharge"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="rechargeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div>
              <label htmlFor="dire" className="text-muted">
                Geli numberka ka dirayso lacagta
              </label>
              <div className="input-group mb-3 rounded-0">
                <span className="input-group-text rounded-0 bg-light">
                  <FaMobileAlt className="text-success" />
                </span>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Ku bilaaw numberka 61 ama 68 ama 77"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dire" className="text-muted">
                Geli numberka ka udiraysid data
              </label>
              <div className="input-group mb-3 rounded-0">
                <span className="input-group-text rounded-0 bg-light">
                  <FaMobileAlt className="text-success" />
                </span>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Iska hubi numberka"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <button
              type="button"
              className="btn btn-danger text-light"
              data-bs-dismiss="modal"
            >
              <FaTimesCircle className="mb-1" /> Close
            </button>
            <button type="button" className="btn btn-success text-light">
              <FaPaperPlane className="mb-1" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RechargeForm
