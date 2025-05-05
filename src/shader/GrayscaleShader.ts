import * as Phaser from "phaser";

export class GrayscalePipeline extends Phaser.Renderer.WebGL.Pipelines
  .SinglePipeline {
  public static readonly KEY = "Grayscale";

  constructor(game: Phaser.Game) {
    super({
      game,
      renderTarget: true, // 이 파이프라인이 렌더링할 타겟이 있다는 것을 명시
      fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                void main(void) {
                vec4 color = texture2D(uMainSampler, outTexCoord);
                float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                gl_FragColor = vec4(vec3(gray), 1.0);
                }`,
    });
  }
}
