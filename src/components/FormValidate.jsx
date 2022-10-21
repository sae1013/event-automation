import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, onBlur,formState:{ errors },setError } = useForm({
    mode:"onTouched",
    reValidateMode:'onChange'

  });
  const onSubmit = data => {
    if(Object.keys(errors).length != 0){
      console.log('에러',errors)
      return
    }
    console.log('submit',data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName" , {required: "This is required." , minLength :{value:2, message:'최소2글자입력'} })}  />
      <p>{errors.firstName?.message}</p>

      <input {...register("phoneNumber" , {required: "This is required." , minLength :{value:2, message:'숫자만입력'} })}  />
      <p>{errors.phoneNumber?.message}</p>
      <button type="submit">제출</button>
    </form>
  );
}