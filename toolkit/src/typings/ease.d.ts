declare namespace EaseKit{
   interface EaseOptions{
   	style?:string,
   	fn?:(K:number)=>number
   }
   type easename=EaseOptions|string
   type easefn = (k:number)=>number
}