import React from "react";
import axiosConfig from "../../store/axiosConfig";

function OrderModal({ Order, option }) {
  const ConfirmAction = async () => {
    // console.log(deleteOrder);
    try {
      const result = await axiosConfig.request({
        method: "PUT",
        url: option === "pendding" ? "/DestroyOrder" : "/ConfirmOrder",
        data: { id: Order },
      });
      if (result.data) {
        window.location.reload();
      }
      // navigate('/r')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="DestroyOrder" tabIndex={-1} role="dialog" aria-labelledby="DestroyOrderTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="DestroyOrderLongTitle">
              {option === "pendding" ? "Hủy Đơn Hàng" : "Đã nhận được hàng"}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {option === "pendding" ? <div className="modal-body">Bạn có muốn hủy đơn hàng này không?</div> : <div className="modal-body">Bạn đã nhận được hàng?</div>}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Đóng
            </button>

            {option === "pendding" ? (
              <button type="button" className="btn btn-outline-danger" onClick={(e) => ConfirmAction(e)}>
                Hủy Đơn Hàng
              </button>
            ) : (
              <button type="button" className="btn btn-outline-danger" onClick={(e) => ConfirmAction(e)}>
                Đã nhận được hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
