import { Route } from 'vue-router';

type Position = { x: number; y: number }
type PositionResult = Position | { selector: string; offset?: Position } | void

export default function scrollBehavior(
  to: Route,
  from: Route,
  savedPosition: Position | void): PositionResult | undefined {
}
