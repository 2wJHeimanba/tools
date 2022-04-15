import { CreateHook, UpdateHook, PreHook, DestroyHook, RemoveHook, PostHook } from './../hooks';

export type Module = Partial<{
    pre:PreHook;
    create:CreateHook;
    update:UpdateHook;
    destroy:DestroyHook;
    remove:RemoveHook;
    post:PostHook
}>;