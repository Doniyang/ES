export default function pixel(px:number):string {
  return px +(isNaN(px )?'': 'px')
}