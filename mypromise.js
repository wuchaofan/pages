const State = {
   PENDING: 0,
   FULFILLED: 1,
   REJECTED: 2
}

class MyPromise{
   constructor(fn){
      this.state = State.PENDING
      this.value = null
      this.handler = null
      fn(this.fulfilled.bind(this), this.rejected.bind(this))
   }
   fulfilled(result){
      this.state = State.FULFILLED
      this.value = result
      this.handler &&  this.handler.fulfilledCb(result)
   }
  rejected(){
      this.state = State.REJECTED
      this.value = result
      this.handler &&  this.handler.rejectedCb(result)
  }
  handleFunc(handler){
      if(this.state == State.PENDING){
          this.handler = handler
      } else if(this.state == State.FULFILLED && typeof handler.fulfilledCb === 'function'){
          handler.fulfilledCb(this.value)
          this.handler = null
      } else if(this.state == State.REJECTED && typeof handler.rejectedCb === 'function'){
          handler.rejectedCb(this.value)
          this.handler = null
      }
  }
  then(fulfilledCb, rejectedCb){
     return new MyPromise((resolve, reject)=>{
         this.handleFunc({fulfilledCb: function(res){
                resolve(fulfilledCb(res))
         }, rejectedCb: function(err){
            try{
               reject(rejectedCb(err))
            }catch(exp){
               reject(exp)
            }
         }})
    })
   }
   static resolve(value){
     return new MyPromise((_resolve, _reject)=>{
       _resolve(value)
     })
   }
   static reject(value){
      return new MyPromise((_resolve, _reject)=>{
       _reject(value)
     })
   }
   static all(promiseList){
      //to do....
   }
}
