"use client";
import React, { useState, useEffect } from "react";
import apiRequest from "@/libs/axios/configs";
import { useFormik } from "formik";
import sendTicketFormSchema from "@/utils/validators/sendTicketFormSchema";

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState("-1");
  const [subDepartmentID, setSubDepartmentID] = useState("-1");

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/department");
      const data = await res.json();
      setDepartments([...data]);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      const res = await fetch(`/api/department/sub/${departmentID}`);
      if (res.status === 200) {
        const data = await res.json();
        setSubDepartments([...data]);
      }
    };
    getSubDepartments();
  }, [departmentID]);

  const sendTicketForm = useFormik({
    initialValues: {
      department: "-1",
      subDepartment: "-1",
      title: "",
      priority: "-1",
      body: "",
    },
    validationSchema: sendTicketFormSchema,
    onSubmit: async (values, { resetForm }) => {
      await apiRequest.post("/tickets", {
        ...values,
        department: departmentID,
        subDepartment: subDepartmentID,
      });
      resetForm();
    },
  });

  return (
    <div className="container mx-2">
      <form action="" onSubmit={sendTicketForm.handleSubmit}>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="product-department mb-2">Department</label>
            <select
              name="department"
              id="product-department"
              defaultValue="-1"
              onChange={(e) => {
                sendTicketForm.handleChange;
                setDepartmentID(e.target.value);
              }}
            >
              <option value="-1">Select Department</option>
              {departments?.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.title}
                </option>
              ))}
            </select>
            {sendTicketForm.errors.department &&
              sendTicketForm.touched.department && (
                <span className="text-xs text-red">
                  {sendTicketForm.errors.department}
                </span>
              )}
          </div>
          <div className="form-col-50">
            <label htmlFor="product-sub-department">Subdepartment</label>
            <select
              name="subDepartment"
              id="product-sub-department"
              defaultValue="-1"
              onChange={(e) => {
                sendTicketForm.handleChange;
                setSubDepartmentID(e.target.value);
              }}
            >
              <option value="-1">Select Subdepartment</option>
              {subDepartments?.map((subDepartment) => (
                <option key={subDepartment._id} value={subDepartment._id}>
                  {subDepartment.title}
                </option>
              ))}
            </select>
            {sendTicketForm.errors.subDepartment &&
              sendTicketForm.touched.subDepartment && (
                <span className="text-xs text-red">
                  {sendTicketForm.errors.subDepartment}
                </span>
              )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="product-title">title</label>
            <input
              type="text"
              name="title"
              id="product-title"
              placeholder="write a title for your ticket"
              value={sendTicketForm.values.title}
              onChange={sendTicketForm.handleChange}
              onBlur={sendTicketForm.handleBlur}
            />
            {sendTicketForm.errors.title && sendTicketForm.touched.title && (
              <span className="text-xs text-red">
                {sendTicketForm.errors.title}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="product-priority">Priority</label>
            <select
              name="priority"
              id="product-priority"
              defaultValue="-1"
              onChange={sendTicketForm.handleChange}
            >
              <option value="-1">Select priority</option>
              <option value={1}>Low</option>
              <option value={2}>Middle</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>
        <div className="custom-row">
          <label htmlFor="ticket-body">Ticket</label>
          <textarea
            id="ticket-body"
            placeholder="Write your message please, we will answer you as soon as possible."
            cols={10}
            rows={5}
            name="body"
            value={sendTicketForm.values.body}
            onChange={sendTicketForm.handleChange}
            onBlur={sendTicketForm.handleBlur}
          />
          {sendTicketForm.errors.body && sendTicketForm.touched.body && (
            <span className="text-xs text-red">
              {sendTicketForm.errors.body}
            </span>
          )}
        </div>
        <button
          className="btn-teal mt-2"
          type="submit"
          disabled={sendTicketForm.isSubmitting}
        >
          <span>{sendTicketForm.isSubmitting ? "Processing..." : "Send"}</span>
        </button>
      </form>
    </div>
  );
}
