# Angular Cleanup

I've noticed throughout the course of my Angular projects that a lot of junk
can build up.  Directives/filters that aren't used anywhere, injected
dependencies that aren't used anywhere, etc.  This is just a simple tool to
tell me where that stuff is.  At the moment only tells you where the problem
children are, but maybe I'll add more automated stuff down the road.

## Current Functions

- Directive/filter cleanup in templates (tells you if there are directives or
  filters not in use in any templates)
- Dependency cleanup (tells you if there are app files with injected
  dependencies that aren't actually used anywhere in the component)

Either a template path must be specified for template clean up OR your app root
(will automatically attempt to figure out the component type) OR specific path
to a component folder (directive/filter/service/controller).

## Usage

```
node app.js [-a|--app app/path] [-t|--templates template/path] [-s|--services services/path] [-d|--directives directives/path] [-f|--filters filters/path] [-c|--controllers controllers/path]
```
