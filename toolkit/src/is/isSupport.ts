export default function isSupport(event:string):boolean{
  return event in document||event in window
}