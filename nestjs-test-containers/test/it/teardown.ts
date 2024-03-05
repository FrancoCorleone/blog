import { getDatasource } from "./util";

const teardown = async () => {
  await global.mysql.stop();
  await (await getDatasource()).destroy();
};

export default teardown;
