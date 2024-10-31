"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import clsx from "clsx";
import {
  IoCheckmarkDoneOutline,
  IoInformationOutline,
  IoLogoFacebook,
  IoLogoGoogle,
} from "react-icons/io5";

import { authenticate } from "@/actions";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      // return router.replace('/');
      window.location.replace("/");
    }
  }, [state]);

  const loginWithGoogle = async () => {
    await signIn("google");
  };

  const loginWithFacebook = async () => {
    await signIn("facebook");
  };

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales Incorrectas</p>
          </div>
        )}

        {state === "Success" && (
          <div className="flex flex-row mb-2">
            <IoCheckmarkDoneOutline className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-blue-500">Credenciales Correctas</p>
          </div>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div className="flex justify-around items-center">
        <button
          onClick={loginWithGoogle}
          type="button"
          className="w-fit border border-black hover:border-white text-black hover:text-white hover:bg-black rounded-md p-2"
        >
          <IoLogoGoogle size={30} />
        </button>
        <button
          onClick={loginWithFacebook}
          type="button"
          className="w-fit border border-black hover:border-white text-black hover:text-white hover:bg-black rounded-md p-2"
        >
          <IoLogoFacebook size={30} />
        </button>
      </div>

      <Link href="/auth/new-account" className="my-2 btn-secondary text-center">
        ¿No tienes una cuenta?,{" "}
        <span className="text-blue-500"> Crear una nueva cuenta</span>
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
