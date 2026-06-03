declare module "vanta/dist/vanta.birds.min" {
  interface VantaBirdsOptions {
    el: HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color1?: number;
    color2?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
    quantity?: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: ((options: VantaBirdsOptions) => { destroy: () => void }) | any;
  export default mod;
}
