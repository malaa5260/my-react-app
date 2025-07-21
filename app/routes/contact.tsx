import { use, useEffect, useRef } from "react";
import type { Route } from "./+types/contact";
import { Form, useActionData, useNavigation } from "react-router";
import type { ActionFunctionArgs } from "react-router";

type FormDataResponse = {
  success: boolean;
  message: string;
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact" },
    { name: "description", content: "Contact us." },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const errors: { name?: string; email?: string; message?: string } = {};

  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Invalid email format";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  return {
    success: true,
    message: `Thanks ${name}, we have received your message!`,
  };
}

export default function Contact() {
  const data = useActionData<{
    success?: boolean;
    message?: string;
    errors?: Record<string, string>;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (data?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [data]);

  return (
    <div className="space-y-4 max-w-md">
      <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>
      <p className="text-gray-700">
        We’d love to hear from you! Fill out the form below.
      </p>

      {data?.success && (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          {data.message}
        </div>
      )}

      <Form ref={formRef} method="post" className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {data?.errors?.name && (
          <p className="text-red-600 text-sm">{data.errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {data?.errors?.email && (
          <p className="text-red-600 text-sm">{data.errors.email}</p>
        )}

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          required
        />
        {data?.errors?.message && (
          <p className="text-red-600 text-sm">{data.errors.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </Form>
    </div>
  );
}
