
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import fs = require('fs');

/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
	private text: MRE.Actor = null;
	private cube: MRE.Actor = null;
	private assets: MRE.AssetContainer;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
		const t = this.text;
		const c = this.cube;
		//const f = this.started;
		//const timerF = this.timerFunction;
        //setInterval(timerF, 15000, t, c, f);
		setInterval(this.timerFunction.bind(this), 15000, this);
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		// Create a new actor with no mesh, but some text.
		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: { position: { x: 0, y: 0.5, z: 0 } }
				},
				text: {
					contents: "",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				}
			}
		});

		// Here we create an animation for our text actor. First we create animation data, which can be used on any
		// actor. We'll reference that actor with the placeholder "text".
		
		// Once the animation data is created, we can create a real animation from it.
		

		// Load a glTF model before we use it
		const cubeData = await this.assets.loadGltf(this.generateNewGLB(), "box");

		// spawn a copy of the glTF model
		this.cube = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cubeData,
			// Also apply the following generic actor properties.
			actor: {
				name: '',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});
		// apply the animation to our cube
		//const flipAnim = await flipAnimData.bind({ target: this.cube });

		// Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
		// Button behaviors have two pairs of events: hover start/stop, and click start/stop.
		const buttonBehavior = this.cube.setBehavior(MRE.ButtonBehavior);

		// Trigger the grow/shrink animations on hover.
		buttonBehavior.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			
		});
		buttonBehavior.onHover('exit', () => {
			
		});

		// When clicked, do a 360 sideways.
		buttonBehavior.onClick(_ => {
			
		});
	}
	// function to change the glb
    generateNewGLB() {
        const files = fs.readdirSync('public/GLB/');
        /* now files is an Array of the name of the files in the folder 
		and you can pick a random name inside of that array */
        const chosenFile = files[Math.floor(Math.random() * files.length)];
        console.log(chosenFile);
        return 'GLB/' + chosenFile;
    }
	
    public timerFunction(that: any) {
        console.log("in timer function");
        that.text.destroy();
        that.cube.destroy();
        that.started();
    }
}
