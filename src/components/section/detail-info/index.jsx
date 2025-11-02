import React from 'react';
import TitleInfo from '../title-info';
import BreakingNews from '../breaking-news';
import Bridegroom from '../bride-groom';
import LoveStory from '../love-story';
import OurGallery from '../our-gallery';
import WishSection from '../wish';
import Footer from '../footer';
import data from '../../../data/config.json';
import SongButton from '../../ui/song-button';
import { resolveAsset } from '../../../lib/assetResolver';

export default function DetailInfo() {
  return (
    <div className="space-y-5 pb-10">
      <img src={resolveAsset(data.thumbnail_image_url)} alt="thumbnail" className="w-full" />
      {/* <video className="w-full" autoPlay muted>
        <source src={data.url_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="px-4 space-y-4">
        <TitleInfo />
        {data.show_menu.breaking_news && <BreakingNews />}
        {data.show_menu.bride_and_groom && <Bridegroom />}
        {data.show_menu.love_story && <LoveStory />}
        {data.show_menu.gallery && (
          <OurGallery gallery={data.gallery} show_menu={data.show_menu} />
        )}
        <div className="text-center pb-4">
          <div className="mb-2 flex justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8888022537435!2d106.8585463!3d-6.6607009999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8fbe689dd45%3A0xb66accd4c1e84eec!2svilla%2027!5e0!3m2!1sid!2sid!4v1762001317644!5m2!1sid!2sid"
            width="350" height="350" style={{border:0}}>
            </iframe>
          </div>
          <a
            className="text-center underline"
            href="https://maps.app.goo.gl/v9UdKeNLGAvFpPzq8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Lokasi
          </a>
        </div>

        <div className="rounded-xl p-5 bg-[#1c1c1c] border border-[#343434] space-y-4">
          <h2 className="text-xl font-bold text-center mb-3">Gift</h2>
          <p className="text-sm text-center mb-4">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
            Namun, apabila Bapak/Ibu/Saudara/i ingin memberi tanda kasih, kami 
            juga menyediakan pilihan berikut:
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4">
            <div className="flex-1 bg-[#232323] rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-center">
                {data.pegantin.pria.nama}
              </h3>
              <div className="space-y-2">
                {data.pegantin.pria.rekening && data.pegantin.pria.rekening.map((rek, idx) => (
                  <div key={idx} className="bg-[#2c2c2c] rounded p-3 flex flex-col items-center">
                    <span className="font-medium">{rek.bank}</span>
                    <span className="font-mono tracking-wide">{rek.nomor}</span>
                    <span className="text-xs text-gray-400">{rek.nama_pemilik}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-[#232323] rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-center">
                {data.pegantin.wanita.nama}
              </h3>
              <div className="space-y-2">
                {data.pegantin.wanita.rekening && data.pegantin.wanita.rekening.map((rek, idx) => (
                  <div key={idx} className="bg-[#2c2c2c] rounded p-3 flex flex-col items-center">
                    <span className="font-medium">{rek.bank}</span>
                    <span className="font-mono tracking-wide">{rek.nomor}</span>
                    <span className="text-xs text-gray-400">{rek.nama_pemilik}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {data.show_menu.wish && import.meta.env.VITE_APP_TABLE_NAME ? (
          <WishSection />
        ) : null}
      </div>
      <Footer />
      <SongButton />
    </div>
  );
}
