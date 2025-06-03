import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const validateSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be 6 digits" })
    .max(6, { message: "Code must be 6 digits" })
    .regex(/^\d{6}$/, { message: "Code must contain only digits" }),
});

type ValidateFormValues = z.infer<typeof validateSchema>;

const ValidateForm = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<ValidateFormValues>({
    resolver: zodResolver(validateSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: ValidateFormValues) => {
    setIsLoading(true);
    try {
      console.log(data);
      // Simulate successful validation
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Enter the 6-digit verification code sent to your email
          </p>
        </div>

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="000000"
                  {...field}
                  maxLength={6}
                  className="h-16 text-center text-2xl tracking-[0.5em] font-mono border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ValidateForm;