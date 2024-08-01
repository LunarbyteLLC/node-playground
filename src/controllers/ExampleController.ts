import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import axios from "axios";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";


@Controller('/example')
export class ExampleController {


    @Get('/')
    async getExample() {
        const response = await axios.get<NodeJS.ReadableStream>('http://proxy/randomjunk.gz', {
            responseType: 'stream',
        });

        const timestamp = Date.now();
        await pipeline(
            response.data,
            createWriteStream(`/tmp/archive_${timestamp}.tar.gz`),
        );
        console.log('Pipeline succeeded.');

        return 'hello world'
    }
}
