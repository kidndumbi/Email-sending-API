import {
  DownloadEndedStats,
  DownloaderHelper,
  DownloaderHelperOptions,
} from 'node-downloader-helper';

export class DownloaderHelperWrapper {
  dl: DownloaderHelper;

  constructor(
    private url: string,
    private destFolder: string,
    private options?: DownloaderHelperOptions,
  ) {
    this.dl = new DownloaderHelper(this.url, this.destFolder, this.options);
  }

  download() {
    return new Promise<DownloadEndedStats>((resolve, reject) => {
      this.dl.on('end', (d: DownloadEndedStats) => resolve(d));
      this.dl.on('error', (err) => reject(err));
      this.dl.start().catch((err) => reject(err));
    });
  }
}
