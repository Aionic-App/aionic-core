import { Router } from 'express'

import { AuthService, PassportStrategy } from '@services/auth'

import { GitRepositoryController } from './controller'

export class GitRepositoryRoutes {
  private readonly controller: GitRepositoryController = new GitRepositoryController()
  private authSerivce: AuthService
  private _router: Router = Router({ mergeParams: true })

  public constructor(defaultStrategy?: PassportStrategy) {
    this.authSerivce = new AuthService(defaultStrategy)

    this.initRoutes()
  }

  public get router(): Router {
    return this._router
  }

  private initRoutes(): void {
    this.router.get(
      '/repositories',
      this.authSerivce.isAuthorized(),
      this.authSerivce.hasPermission('gitOrgRepos', 'read'),
      this.controller.readGitOrgRepos
    )
  }
}
