import React, { useEffect, useState } from 'react';
import data from '../../../data/config.json';
import { resolveAsset } from '../../../lib/assetResolver';


export default function Bridegroom() {

  //get params from url
  const [to, setTo] = useState('Guest');

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);
      const to = url.searchParams.get('to');
      setTo(to ? to : 'Guest');
    }
  }, []);


  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Bride and Groom
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src={resolveAsset(data.pegantin.wanita.foto)}
            className="w-full rounded-md"
            height={164}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.wanita.nama}
            </h4>
            <a href={`https://www.instagram.com/${data.pegantin.wanita.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#A3A1A1] text-xs leading-4 mt-2">
              <div className="flex items-center">
                <img src={resolveAsset('/assets/instagram.png')} alt="Instagram" className="w-4 h-4 inline-block mr-1" />
                  <span style={{ paddingTop: '2px' }}>
                    {data.pegantin.wanita.instagram}
                  </span>
              </div>
            </a>
            {[
              'keluarga besar line 5',
              'yemi & partner',
              'muti & partner',
              'shofi & partner',
              'rita & partner',
              'selin & partner',
              'teh unyil & partner',
              'teh encap & partner',
              'ibu risma & partner',
            ].indexOf(to.toLowerCase()) === -1 && (
              <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
                Putri dari {data.pegantin.wanita.bapak} &amp; Ibu{' '}
                {data.pegantin.wanita.ibu}
              </p>
            )}
          </div>
        </div>
        <div>
          <img
            src={resolveAsset(data.pegantin.pria.foto)}
            className="w-full rounded-md"
            height={164}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.pria.nama}
            </h4>
            <a href={`https://www.instagram.com/${data.pegantin.pria.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#A3A1A1] text-xs leading-4 mt-2">
            <div className="flex items-center">
              <img src={resolveAsset('/assets/instagram.png')} alt="Instagram" className="w-4 h-4 inline-block mr-1" />
                <span style={{ paddingTop: '2px' }}>
                  {data.pegantin.pria.instagram}
                </span>
            </div>
            </a>
            {[
              'keluarga besar line 5',
              'yemi & partner',
              'muti & partner',
              'shofi & partner',
              'rita & partner',
              'selin & partner',
              'teh unyil & partner',
              'teh encap & partner',
              'ibu risma & partner',
            ].indexOf(to.toLowerCase()) === -1 && (
              <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
                Putra dari {data.pegantin.pria.bapak} &amp; Ibu{' '}
                {data.pegantin.pria.ibu}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
