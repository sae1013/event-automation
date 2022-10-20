import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, onBlur,formState:{ errors },setError } = useForm({
    mode:"onTouched",
    reValidateMode:'onChange'

  });
  const onSubmit = data => console.log('submit',data);

  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName" , {required: "This is required." , minLength :{value:2, message:'hello'} })}  />
      <p>{errors.firstName?.message}</p>

      <input type="submit" />
    </form>
  );
}