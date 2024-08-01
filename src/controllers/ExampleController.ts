import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import axios from "axios";


@Controller('/example')
export class ExampleController {


    @Get('/')
    async getExample() {
        const response = await axios.get('http://proxy/randomjunk.gz', {
            responseType: 'arraybuffer',
            maxContentLength: Infinity,
        });

        return 'hello world'
    }
}
