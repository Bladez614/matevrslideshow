/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
export default class MyHelloWorld {
	private kitObject: MRE.Actor;
	private kitObjectIds = ['2018534096317186743',
							'2018555068038512912',
							'2018554823057605609',
							'2018555067115766027',
							'2018555065807143171',
							'2018554966586687590',
							'2018555066327236870',
							'2018554914283716644',
							'2018555067249983756',
							'2018554840749179891',
							'2018555067510030605',
							'2018554923720900647',
							'2018555066595672328',
							'2018555068424388883',
							'2018555067770077455',
							'2018554986115367048',
							'2018554849406223352',
							'2018554803268879326',
							'2018554814014686181',
							'2018555066067190020',
							'2018555066201407749',
							'2018555004989735078',
							'2018555065547096321',
							'2018555066989936906',
							'2018554976149700726',
							'2018555033955598553',
							'2018554832234742766',
							'2018555043527000297',
							'2018555060430045435',
							'2018555065412878590',
							'2018555065152831741',
							'2018554858314925052',
							'2018555066855719177',
							'2018555052309872885',
							'2018555066461454599',
							'2018554867492061186',
							'2018554886232211472',
							'2018554876795027466',
							'2018554895803613205',
							'2018554957149503572',
							'2018554933158084651',
							'2018554947838148676',
							'2018554904846532635',
							'2018555068298559762',
							'2018555024778461383',
							'2018555067644248334',
							'2018555015081230518',
							'2018555065672925442',
							'2018555068164342033'];
	private assets: MRE.AssetContainer = null;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started(this.getId()));
		setInterval(this.timerFunction.bind(this), 15000, this);
	}
	
	private started(id: string) {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		this.kitObject = MRE.Actor.CreateFromLibrary(this.context,{
			resourceId: 'artifact:' + id,
				actor: {
					transform:{
						local: {
							position: { x: 0, y: 0, z: 0 }
						}
					}
				}
		})

		this.kitObject.appearance.enabled = true;

		// for (const id of this.kitObjectIds){
		// 	this.kitObjects.push(MRE.Actor.CreateFromLibrary(this.context,{
		// 		resourceId: 'artifact:' + id,
		// 		actor: {
		// 			transform:{
		// 				local: {
		// 					position: { x: 0, y: 0, z: 0 }
		// 				}
		// 			}
		// 		}
		// 	}));
		// 	this.kitObjects[this.activeModel].appearance.enabled = true;
		// 	await this.delay(15000);
		// 	this.kitObjects[this.activeModel].appearance.enabled = false;
		// 	++this.activeModel;
		// 	if(this.activeModel === this.kitObjects.length){ this.activeModel = 0; }
		// }
	}
	getId(){
		const random = Math.floor(Math.random() * this.kitObjectIds.length) + 1;
		return this.kitObjectIds[random];
	}
	timerFunction(that: any){
		that.kitObject.destroy();
		that.started(that.getId());
	}
}
