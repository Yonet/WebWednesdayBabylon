import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { FreeCamera, WebXRHitTest } from '@babylonjs/core';

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core";
import { CreateSceneClass } from "../createScene";

// If you don't need the standard material you will still need to import it since the scene requires it.
// import "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core";

import grassTextureUrl from "../../assets/grass.jpg";
import { Mesh, MeshBuilder } from "@babylonjs/core/Meshes";

export class DefaultSceneWithTexture implements CreateSceneClass {

    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 1, -5), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        const sphere = Mesh.CreateSphere(
            "sphere", 32, 2,
            scene
        );

        // Move the sphere upward 1/2 its height
        sphere.position.y = 2;
        sphere.position.z = 5;

        // Our built-in 'ground' shape.
        // const ground = GroundBuilder.CreateGround(
        //     "ground",
        //     { width: 6, height: 6 },
        //     scene
        // );

        // Load a texture to be used as the ground material
        const groundMaterial = new StandardMaterial("ground material", scene);
        groundMaterial.diffuseTexture = new Texture(grassTextureUrl, scene);

        // ground.material = groundMaterial;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const xr = await scene.createDefaultXRExperienceAsync({
            // ask for an ar-session
            uiOptions: {
                sessionMode: "immersive-ar",
                referenceSpaceType: "local-floor"
            },
            optionalFeatures: true,
        });

        const featuresManager = xr.baseExperience.featuresManager;
        // featuresManager.enableFeature('xr-hit-test', 'latest');
        // const xrHitTest = featuresManager.getEnabledFeature('xr-hit-test') as WebXRHitTest;
        //getFeature<WebXRHitTest>('xr-hit-test');
        // const xrPlane = featuresManager.enableFeature(WebXRPlaneDetector.Name, 'latest');
        // const xrAnchors = featuresManager.enableFeature(WebXRAnchorSystem.Name, 'latest');


        // const xrBackgroundRemover = featuresManager.enableFeature(WebXRBackgroundRemover.Name, 'latest');

        const marker = MeshBuilder.CreateTorus("marker", { diameter: 0.1, thickness: 0.05 }, scene);
        // marker.isVisible = false;
        marker.rotationQuaternion = new Quaternion();
        // xrHitTest.onXRHitTestResultObservable.add((result) => { console.log * (result) });
        // xrHitTest.onHitTestResultObservable(results: string | any[]) => {
        //     if (results.length > 0) {
        //         marker.isVisible = true;
        //         const hitTest = results[0];
        //         hitTest.transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
        //     } else {
        //         marker.isVisible = false;
        //     }
        // };


        // sphere.isVisible = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        // xrHitTest.onHitTestResultObservable.add((result: any) => {
        //     console.log(result)
        // });
        // xrHitTest.onHitTestResultObservable.xrHitResult((results: any) => {
        //     if (results.length) {
        //         sphere.isVisible = true;
        //         // results[0].transformationMatrix.decompose(sphere.scaling, sphere.rotationQuaternion, sphere.position);
        //     } else {
        //         sphere.isVisible = false;
        //     }
        // });

        return scene;
    };
}

export default new DefaultSceneWithTexture();