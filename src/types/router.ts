import Koa from 'koa'
import Router from 'koa-router'

export type KoaCtx = Koa.ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>
