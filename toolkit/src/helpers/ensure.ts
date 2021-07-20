import isNull from "../is/isNull"
import isEmptyString from "../is/isEmptyString"
import isUndefined  from "../is/isUndefined"
import isArray  from "../is/isArray"


export default function ensure(value:any,def:Array<any>=[]):Array<any>{
    return isArray(value)?value: (isNull(value)||isEmptyString(value)||isUndefined(value))?[]:def
}

