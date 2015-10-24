type REvent = RES.ResourceEvent;
import {Promise} from 'es6-promise'
//require('es6-promise');

export function loadGroup(group:string):Promise<REvent>{
	return new Promise<REvent>((resolve:(val:REvent)=>void)=>{
		var handler:any = {};

		function callbackWrapper(event:REvent){
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, callbackWrapper, handler);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, callbackWrapper, handler);
			resolve(event);
		}

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, callbackWrapper, handler);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, callbackWrapper, handler);
		RES.loadGroup(group);
	});
}

export function loadConfig(config:string, path:string):Promise<REvent>{
	return new Promise<REvent>((resolve:(val:REvent)=>void)=>{
		var handler:any = {};

		function onConfigComplete(event:REvent){
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, handler);
			resolve(event);
		}
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, handler);
		RES.loadConfig(config, path);
	});
}

export function once(thing:egret.EventDispatcher, type:string):Promise<egret.Event>{
	return new Promise<egret.Event>((resolve:(val:egret.Event)=>void)=>{
		function wrapper(event:egret.Event){
			thing.removeEventListener(type, wrapper, thing);
			resolve(event);
		}
		thing.addEventListener(type, wrapper, thing);
	});
}

export function getResAsync(name:string):Promise<Array<any>>{
	return new Promise<Array<any>>(resolve=>{
		var handler:any = {};
		function wrapper(data:Array<any>){
			resolve(data);
		}
		RES.getResAsync(name, wrapper, handler);
	});
}
