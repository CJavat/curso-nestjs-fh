"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

import { login, registerUser } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { email, name, password } = data;

    // Server Actions
    const resp = await registerUser(name, email, password);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);

    window.location.replace("/");
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nombre Completo</label>
      <div className="mb-5">
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": errors.name,
          })}
          type="text"
          autoFocus
          {...register("name", { required: true })}
        />
        {errors.name?.type === "required" && (
          <span className="text-red-500">Este campo es obligatorio</span>
        )}
      </div>

      <label htmlFor="email">Correo electrónico</label>
      <div className="mb-5">
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": errors.email,
          })}
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500">Este campo es obligatorio</span>
        )}
        {errors.email?.type === "pattern" && (
          <span className="text-red-500">Correo inválido</span>
        )}
      </div>

      <label htmlFor="email">Contraseña</label>
      <div className="mb-5">
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": errors.password,
          })}
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && (
          <span className="text-red-500">Este campo es obligatorio</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-500">Escribe mínimo 6 caracteres</span>
        )}
      </div>

      <button className="btn-primary">Crear Cuenta</button>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Iniciar Sesión
      </Link>
    </form>
  );
};
