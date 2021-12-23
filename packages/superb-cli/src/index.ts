#!/usr/bin/env node
import { Command } from 'commander'
import { build } from './commands/build'
import { dev } from './commands/dev'

const program = new Command()

program.command('dev').description('Run superb development environment').action(dev)

program.command('build').description('Build varlet site for production').action(build)

program.parse()
