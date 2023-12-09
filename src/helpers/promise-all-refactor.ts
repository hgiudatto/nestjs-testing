/* interface PromiseTimeout {(timeout:number):void}
const promesa_de_timeout:PromiseTimeout = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay));

const goodBuffer = []
const  revokedBuffer = []

const promesa_de_pago = (goodbuffer, revokedbuffer, pago) => new Promise((resolve,reject) => {
   const respuesta = await checkout(...)
   if (!!true) {
 goodBuffer.push(respuesta)
}  else {revokedBuffer.push(respuesta)}
   promesa_de_timeout(500)
})

(...pagos...).forEach(pagos => {
    await promesa_de_pago(goodBuffer, revokedBuffer, pago)
})

return [goodBuffer , revokedBuffer]
 */
