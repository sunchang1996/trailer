import { resolve } from "path";
import { Router } from "../lib/decorator";

export const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Router(app, apiPath)

  router.init()
}