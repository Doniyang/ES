declare namespace NotifierKit{
    type NotiyParams = number | string | boolean | object

    interface NotifyEventCallback<T> {
        (evt:T,...args:Array<NotiyParams>):void
    }
}