"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaGear,
  FaMoneyBills,
  FaMoneyBill1,
  FaDatabase,
  FaRuler,
  FaPaintbrush,
  FaBookOpen,
  FaImage,
} from "react-icons/fa6";
import CartRow from "@/components/templates/cart/CartRow";
import checkDiscountFormSchema from "@/utils/validators/checkDiscountFormSchema";
import { useFormik } from "formik";
import apiRequest from "@/libs/axios/configs";
import { useRouter } from "next/navigation";
import EmptyCart from "./EmptyCart";

export default function UserCart({ user }) {
  const delivery = 15;
  const [userCart, setUserCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [percent, setPercent] = useState(null);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);
  const router = useRouter();

  const cartCalc = () => {
    let price = 0;
    if (userCart.length) {
      price = userCart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }
    setTotalPrice(price.toFixed(2));
  };

  const checkDiscountForm = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: checkDiscountFormSchema,
    onSubmit: async (values, resetForm) => {
      const response = await apiRequest.put("/discounts/use", values);
      if (response.status === 200) {
        const mainPercent = response.data.percent;
        setPercent(mainPercent);
        const newPrice = Math.floor(
          totalPrice - (totalPrice * mainPercent) / 100
        );
        setTotalPriceWithDiscount(newPrice);
      }
      resetForm();
    },
  });

  const submitOrder = async () => {
    const orderDetails = {
      totalPrice: percent
        ? Number(totalPriceWithDiscount) + Number(delivery)
        : Number(totalPrice) + Number(delivery),
      basket: userCart,
      userId: user._id,
    };
    console.log(orderDetails);
    const res = await apiRequest.post("/orders", orderDetails);
    if (res.status === 201) {
      localStorage.removeItem("cart");
      user.role === "ADMIN" ? router.replace("/") : router.replace("/profile");
    }
  };

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setUserCart(localCart);
  }, []);

  useEffect(cartCalc, [userCart]);

  return (
    <>
      {userCart.length === 0 ? (
        <EmptyCart />
      ) : (
        <main>
          <section className="flex items-start justify-start gap-12 px-8 flex-wrap">
            <div>
              <table className="cms-table mb-4">
                <caption className="text-lg font-bold text-tint text-start mb-2">
                  My Cart
                </caption>
                <thead>
                  <tr>
                    <th className="hidden sm:block">
                      <div>
                        <span className="hidden md:block">Product Image</span>
                        <FaImage className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Name</span>
                        <FaBookOpen className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Color</span>
                        <FaPaintbrush className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Size</span>
                        <FaRuler className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Qty</span>
                        <FaDatabase className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Price</span>
                        <FaMoneyBill1 className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Subtotal</span>
                        <FaMoneyBills className="md:hidden" />
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="hidden md:block">Operations</span>
                        <FaGear className="md:hidden" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userCart.map((product, index) => {
                    return (
                      <CartRow key={index} {...product} userId={user._id} />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <table className="cms-table mb-4">
                <caption className="text-lg font-bold text-tint text-start mb-2">
                  Order Summary
                </caption>
                <tbody>
                  <tr>
                    <td>
                      <h4 className="font-semibold text-sm text-start">
                        Sub Total
                      </h4>
                    </td>
                    <td
                      className={
                        percent
                          ? "line-through decoration-rose-800 text-end"
                          : "text-end"
                      }
                    >
                      $ {totalPrice}
                    </td>
                  </tr>
                  <tr className={percent ? "table-row" : "hidden"}>
                    <td>
                      <h4 className="font-semibold text-sm text-start">
                        Discount applied
                      </h4>
                    </td>
                    <td className="text-end">
                      <span className="font-semibold">
                        $ {totalPriceWithDiscount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                  <tr className={percent ? "table-row" : "hidden"}>
                    <td>
                      <h4 className="font-semibold text-sm text-start text-rose-800">
                        Your benefit
                      </h4>
                    </td>
                    <td className="text-end">
                      <span className="font-semibold text-rose-800">
                        ${" "}
                        {Math.floor(
                          (totalPrice * percent) / 100
                        ).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className="font-semibold text-sm text-start">
                        Delivery Fee
                      </h4>
                    </td>
                    <td className="text-end">$ {delivery}</td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className="font-semibold text-sm text-start">
                        Grand Total
                      </h4>
                    </td>
                    <td className="cart-total">
                      ${" "}
                      {percent
                        ? Number(totalPriceWithDiscount) + Number(delivery)
                        : Number(totalPrice) + Number(delivery)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="cms-table mb-4">
                <caption className="text-lg font-bold text-tint text-start mb-2">
                  Delivery Info
                </caption>
                <tbody>
                  <tr>
                    <td>
                      <h4 className="text-sm font-semibold text-start">
                        Address
                      </h4>
                    </td>
                    <td>
                      <h3 className="text-sm text-end">{user.address}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className="text-sm font-semibold text-start">ZIP</h4>
                    </td>
                    <td>
                      <h3 className="text-sm text-end">{user.zip}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className="text-sm font-semibold text-start">
                        Phone
                      </h4>
                    </td>
                    <td>
                      <h3 className="text-sm text-end">{user.phone}</h3>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link href="/profile/account" className="btn-teal">
                Change Info
              </Link>
            </div>
          </section>
          <section className="m-8">
            <form
              action=""
              onSubmit={checkDiscountForm.handleSubmit}
              className="flex items-center gap-2 mt-3"
            >
              <input
                type="text"
                name="code"
                value={checkDiscountForm.values.code}
                onChange={checkDiscountForm.handleChange}
                onBlur={checkDiscountForm.handleBlur}
                placeholder="Apply coupon code"
                className="border border-tint rounded px-2 py-0.5 outline-none"
              />
              {checkDiscountForm.errors.code &&
                checkDiscountForm.touched.code && (
                  <span className="text-xs text-rose-800">
                    {checkDiscountForm.errors.code}
                  </span>
                )}
              <button
                type="submit"
                className="btn-tint"
                disabled={checkDiscountForm.isSubmitting}
              >
                <span>
                  {checkDiscountForm.isSubmitting
                    ? "Processing..."
                    : "Check Code"}
                </span>
              </button>
            </form>
          </section>
          <section className="m-8">
            <div className="flex items-start justify-start gap-3">
              <button className="btn-teal" onClick={submitOrder}>
                Place Order
              </button>
              <Link href="/market" className="btn-tint">
                Continue Shopping
              </Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
