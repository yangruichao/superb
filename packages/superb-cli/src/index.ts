#!/usr/bin/env node
import { Command } from 'commander'
import { build } from './commands/build'
import { dev } from './commands/dev'
import { compile } from './commands/compile'

const program = new Command()

program.command('dev').description('Run superb development environment').action(dev)

program.command('build').description('Build superb site for production').action(build)

program
  .command('compile')
  .description('Compile superb components library code')
  .option('-w, --watch', 'Watch files change auto compile')
  .action(compile)

program.parse()
