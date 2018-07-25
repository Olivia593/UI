export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

export function remove_item(obj){
    return {
        type: REMOVE_ITEM,
        obj
    }
}

export function add_item(obj){
    return {
        type: ADD_ITEM,
        obj
    }
}