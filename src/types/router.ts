import type { ParameterizedContext } from 'koa'
import type Koa from 'koa'
import type Router from 'koa-router'

export type KoaCtx = ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>
export type KoaNext = Koa.Next
