import Koa, { ParameterizedContext } from 'koa'
import Router from 'koa-router'

export type KoaCtx = ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>
export type KoaNext = Koa.Next
