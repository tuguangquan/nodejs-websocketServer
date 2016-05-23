'use strict'
var util = require('util'),
    events = require('events')

function List(){
    this.data = new Array();
    this.add = add;
    this.remove = remove;
    this.removeItem = removeItem;
    this.elementAt = elementAt;
    this.setElementAt = setElementAt;
    this.insert = insert;
    this.contains = contains;
    this.length = length;
    this.toString = toString;
}

function add(item){
    this.data[this.data.length] = item;
}

function remove(index){
    var  data = this.data;
    data[index] = null;
    var tmpdata = new Array();
    var newindex = 0;
    for(var i = 0;i < data.length;i++){
     if(data[i] != null ){
        tmpdata[newindex] = data[i];
        newindex++;
      }
    }
    this.data = tmpdata;
}

function removeAll(){
    this.data = new Array();
}

function removeItem(item){
    var data=this.data;
    var tmpdata = new Array();
    var newindex = 0;
    for(var i= 0;i< data.length;i++){
       if(data[i]!= item){
          tmpdata[newindex]=data[i];
        }
        newindex++;
    }
    this.data=tmpdata;
}

function elementAt(index){
     return this.data[index];
}

function setElementAt(index,item){
     this.data[index]= item;
}

function insert(index, item){
    if(index == this.data.length){
       this.add(item);
       return;
     }
     var data = this.data;
     var tmpdata = new Array();
     var newindex = 0;
     for(var i= 0;i<data.length; i++){
         if(i == index){
           tmpdata[i]   =   item;
           newindex++;
          }
          tmpdata[   newindex   ]   =   data[   i   ];
          newindex++;
      }
     this.data= tmpdata;
}

function  contains(item){
    for(var i= 0;i <this.data.length;i++){
       if(this.data[i] == item){
            return   true;
          }
     }
     return false;
}

function length(){
    return this.data.length;
}

function toString(){
    var dataString = "[";
    var data = this.data;
    for(var i = 0;i <data.length; i++ ){
      dataString   +=   data[i]   +   "   ";
     }
    dataString   +=   "] ";
    return  dataString;
}

util.inherits(List, events.EventEmitter)
module.exports = List